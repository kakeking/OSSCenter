# OSSCenter

OSS center is a full stack web site implemented using MEAN stack that displays hardware integration information inside lab. 

OMS, Netact are hardware components that connected to eNodeB. They were constantly upgraded/downgraded to different release of software to test various features. The hardwares themselves operate with linux system and don't have interface. Make sure related components had correct configurations(such as north bridge/south bridge ip) are an important prerequise for a number of test cases. 

OSS center was developed to show above information, provide API for test automation. Usage of this application could save hours of testing effort by converting manual cases to fully automated test cases and run over night on Jenkins sever. 

## Website Setup 
### Softwares
1. Mongo DB https://www.mongodb.com community version
2. Nodejs https://nodejs.org/zh-cn/ 
3. Python latest 2.7.* (for legacy reasons, python 2 was used instead of python 3)
4. Python modules: install pymongo, update paramiko to latest version
5. Node modules: install nodemon(server side), angular-cli(client side)
6. Git: For version control

To start app:

Open new cmd window: 
```
mongod #to start mongo service
cd ../server: nodemon #to start server side
cd ../client: npm start #to start app
```

Database:

* Name: osscenter
* Collection: oms, netact, time
* Data backup: /config/database-bak

This app follows MVC design structure, all source files are orgainsed into corresponding folders.

