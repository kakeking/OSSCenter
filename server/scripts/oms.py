import paramiko
import pymongo
import pprint
import time
import re
from pymongo import MongoClient
import socket
paramiko.util.log_to_file("sshconnection.log")

def ssh_to_oms(oms, cmd):
    proxy = None
    ssh = paramiko.SSHClient()
    ssh.load_system_host_keys()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        ssh.connect(oms['south'], username = oms['username'], password=oms['password'], sock=proxy)
    except socket.error, exc:
        # result = 'OMS%s cannot be connected'%oms
        return False
    if oms['username'] != 'root':
        s = ssh.invoke_shell()
        time.sleep(0.1)
        s.send('su - \n')
        buff = ''
        while not buff.endswith('Password: '):
            resp = s.recv(9999)
            buff += resp
        s.send(oms['superpw'])
        s.send('\n')
        buff = ''
        while not buff.endswith('# '):
            resp = s.recv(9999)
            buff += resp
        s.send(cmd)
        s.send('\n')
        buff = ''
        while not buff.endswith('# '):
            resp = s.recv(9999)
            buff += resp
        s.close()
        result = buff
    else:
        ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command(cmd)
        result = ssh_stdout.read()
        ssh.close()
    return result

def get_netactInfo_by_node7Ip(node7Ip):
    proxy = None
    ssh = paramiko.SSHClient()
    ssh.load_system_host_keys()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print 'find integrated netact and connect to %s'%node7Ip
    try:
        ssh.connect(node7Ip, username='omc2', password='zhouhang2', sock=proxy, timeout=300)
    except paramiko.AuthenticationException:
        try:
            ssh.connect(node7Ip, username='root', password='arthur', sock=proxy, timeout=300)
        except paramiko.AuthenticationException:
            try:
                ssh.connect(node7Ip, username='omc2', password='zhouhang3', sock=proxy, timeout=300)
            except paramiko.AuthenticationException:
                return 1

    except socket.error as serr:
        return 2

    ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command('cat /etc/hosts')
    result = ssh_stdout.read()
    ssh.close()
    return result

def get_netact_adaptation_info(node18Ip):
    proxy = None
    ssh = paramiko.SSHClient()
    ssh.load_system_host_keys()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        ssh.connect(node18Ip, username='omc2', password='zhouhang2', sock=proxy)
    except paramiko.AuthenticationException:
        ssh.connect(node18Ip, username='root', password='arthur', sock=proxy)
    adaptation = {}
    current_version = ''
    ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command('cat /etc/mpp-netact-release')
    current_version = ssh_stdout.read()
    ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command('ls /etc/opt/nokia/oss/rac/conf/metadata/cmdsre')
    adaptation['cmdsre'] = ssh_stdout.read()
    ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command('ls /etc/opt/nokia/oss/rac/conf/metadata/cmdsrer')
    adaptation['cmdsrer'] = ssh_stdout.read()
    ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command('ls /etc/opt/nokia/oss/rac/conf/metadata/cmdlte')
    adaptation['cmdlte'] = ssh_stdout.read()
    ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command('ls /etc/opt/nokia/oss/rac/conf/metadata/cmdsrm')
    adaptation['cmdsrm'] = ssh_stdout.read()
    ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command('ls /etc/opt/nokia/oss/rac/conf/metadata/cmdmr')
    adaptation['cmdmr'] = ssh_stdout.read()
    return adaptation, current_version

def get_netactInfo_by_oms(oms):
    netact = {}
    print 'connect to %s'%oms['name']
    raw = ssh_to_oms(oms, "printIOR `fsnwi3ctl -i | grep 'NAR_REG_SERVICE_IOR' | sed -e 's/NAR_REG_SERVICE_IOR=//'` | grep host")
    re_node7Ip = re.compile(r'\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b')
    if re_node7Ip.search(raw):
        netact_nodes = {}
        netact_node7Ip = re.search(re_node7Ip, raw).group()
        output = get_netactInfo_by_node7Ip(netact_node7Ip)
        if output == 1:
            print 'No valid username/password found to connect to netact with IP: %s'%netact_node7Ip
            return None
        if output == 2:
            print 'Netact with ip %s refused the connection'%netact_node7Ip
            return None
        else:
            re_nodes = re.compile(r'(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s*clab\d{3,4}(node\d{1,})')
            for node in re.finditer(re_nodes, output):
                netact_nodes[node.group(2)] = node.group(1)
            re_host = re.compile(r'clab\d{3,4}node18')
            netact_host_name = re.search(re_host, output).group()
            netact_host_name = netact_host_name.replace('node18', '')
            netact_id = int(netact_host_name.replace('clab', ''))
            netact['_id'] = netact_id
            netact['name'] = netact_host_name
            (adaptation, version) = get_netact_adaptation_info(netact_nodes['node18'])
            netact['adaptation'] = adaptation
            netact['version'] = version
            netact['nodes'] = netact_nodes
            netact['owner'] = 'MN 4G RAN Airscale China Feature Prodzn OAM HZH1 Verification'
            netact['username'] = 'omc2'
            netact['password'] = 'zhouhang2'
            netact['enbversion'] = 'N/A'
            netact['release'] = 'N/A'
            netact['oms'] = [oms['_id']]
            return netact
    else:
        return None

def get_oms_version(oms):
    raw = ssh_to_oms(oms, 'currentset')
    re_version = re.compile(r'R_GOMS.*')
    version = re.search(re_version, raw).group().replace('\r', '')
    return version


def query_db_and_insert_netact():
    client = MongoClient('mongodb://localhost:27017/')
    db = client.osscenter
    oms_collection = db.oms
    netact_collection = db.netact
    netact_collection.update({}, {"$set": {"oms":[]}}, multi=True)

    for oms in oms_collection.find():
        connection = ssh_to_oms(oms,'')
        if connection is not False:
            oms_version = get_oms_version(oms)
            oms_collection.update_one({"_id": oms["_id"]}, {"$set": {"status": "normal"}})
            oms_collection.update_one({"_id": oms["_id"]}, {"$set": {"version": oms_version}})
            netact = get_netactInfo_by_oms(oms)
            if netact is not None:
                exist = netact_collection.find_one({'_id': netact['_id']})
                if exist is not None:
                    netact_collection.update({'_id': netact['_id'], "oms._id":{ "$ne": oms['_id']}}, {'$addToSet': {'oms': oms['_id']}})
                    oms_collection.update_one({"_id": oms["_id"]}, {"$set": {"integration": netact['name']}},
                                              upsert=True)
                else:
                    netact_collection.update({"_id": netact["_id"]},netact, upsert = True)
                    oms_collection.update_one({"_id": oms["_id"]}, {"$set": {"integration": netact['name']}}, upsert = True)
            else:
                oms_collection.update_one({"_id": oms["_id"]}, {"$set": {"integration": 'None'}}, upsert = True)
        else:
            oms_collection.update_one({"_id": oms["_id"]}, {"$set": {"status": "fail to connect"}})

    # for netact in netact_collection.find():
    #     pprint.pprint(netact)
query_db_and_insert_netact()





