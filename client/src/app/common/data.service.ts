import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { catchError, map, tap } from 'rxjs/operators';
import { Oms } from '../common/oms.model';
import { Netact } from '../common/netact.model';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {

  public add_subject = new Subject<String>();

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  /** GET oms from server */
  getOmss(): Observable<Oms[]> {
    return this.http.get<Oms[]>('/api/oms')
      .pipe(
        tap(oms => this.log('fetched omss')),
        catchError(this.handleError('getOmss', []))
      );
  }

  /** GET oms by id. Return 'undefined' when id not found **/
  getOmsNo404<Data>(id: string): Observable<Oms> {
    const url = `/api/oms/?id=${id}`;
    return this.http.get<Oms[]>(url)
      .pipe(
          map(omss => omss[0]), // returns a {0|1} element array
          tap(h => {
              const outcome = h ? 'fetched' : 'did not find';
              this.log(`$(outcome) oms id=${id}`);
          }),
          catchError(this.handleError<Oms>(`getOms id=${id}`))

      );
  }
  /** GET oms by id, return 404 if id not found */
  getOms(id: number): Observable<Oms> {
    const url = `/api/oms/${id}`;
    return this.http.get<Oms>(url).pipe(
      tap(_ => this.log(`fetched oms id=${id}` )),
      catchError(this.handleError<Oms>(`getOms id=${id}`))
    );
  }

  /**POST add a new oms to the server */
  addOms(oms: Oms): Observable<Oms> {
    return this.http.post<Oms>('api/oms/add', oms, httpOptions).pipe(
      tap((oms: Oms) => this.log(`added oms w/ id=${oms._id}`)),
      catchError(this.handleError<Oms>('addOms'))
    );
  }

  /** DELETE: delete oms from the server */
  deleteOms (oms: Oms | number): Observable<Oms> {
    const id = typeof oms === 'number' ? oms : oms._id;
    const url = `api/oms/${id}`;

    return this.http.delete<Oms>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted oms id=${id}`)),
      catchError(this.handleError<Oms>('deleteOms'))
    );
  }

  /** PUT: update oms on the server */
  updateOms (oms: Oms): Observable<any> {
    return this.http.put('api/oms', oms, httpOptions).pipe(
      tap(_ => this.log(`updated oms id=${oms._id}`)),
      catchError(this.handleError<any>('updatedOms'))
    );
  }

  /** Get oms whose version contains search term */
  searchOmss(term: string): Observable<Oms[]> {
    if (!term.trim()) {
      // if not search term, return empty oms array
      return of([]);
    }
    return this.http.get<Oms[]>(`api/oms/?version=${term}`).pipe(
      tap(_ => this.log(`found oms matching "${term}"`)),
      catchError(this.handleError<Oms[]>('searchOms', []))
    );
  }
  /** GET netacts from server**/
  getNetacts(): Observable<Netact[]> {
     return this.http.get<Netact[]>('/api/netact')
      .pipe(
          tap(netacts => this.log('fetched netacts')),
          catchError(this.handleError('getNetacts', []))
      );
  }
  /** GET netact by id. Return 'undefined' when id not found **/
  getNetactNo404<Data>(id: string): Observable<Netact> {
      const url = `/api/netact/?id=${id}`;
      return this.http.get<Netact[]>(url)
        .pipe(
            map(netacts => netacts[0]), // returns a {0|1} element array
            tap(h => {
                const outcome = h ? 'fetched' : 'did not find';
                this.log(`$(outcome) netact id=${id}`);
            }),
            catchError(this.handleError<Netact>(`getNetact id=${id}`))

        );
  }
  /** GET netact by id, return 404 if id not found */
  getNetact(id: number): Observable<Netact> {
    const url = `/api/netact/${id}`;
    return this.http.get<Netact>(url).pipe(
      tap(_ => this.log(`fetched netact id=${id}` )),
      catchError(this.handleError<Netact>(`getNetact id=${id}`))
    );
  }

   /** PUT: update netact on server */
   updateNetact (netact: Netact): Observable<any> {
    return this.http.put(`api/netact/`, netact, httpOptions).pipe(
      tap(_ => this.log(`updated netact id=${netact._id}`)),
      catchError(this.handleError<any>('updatedNetact'))
    );
  }

    /** DELETE: delete netact from server */
    deleteNetact (netact: Netact | number): Observable<Netact> {
      const id = typeof netact === 'number' ? netact : netact._id;
      const url = `api/netact/${id}`;

      return this.http.delete<Netact>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted netact id=${id}`)),
        catchError(this.handleError<Netact>('deleteNetact'))
      );
    }

    /*refreshData (): Observable<any> {
      const url = 'api/refresh';
      return this.http.get(url, httpOptions).pipe(
        tap(h => this.log(`${h}`)),
        catchError(this.handleError<any>('refresedData'))
      );
    }*/
    refreshData () {
      }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a DataService message with the MessageService */
  private log(message: string) {
    this.messageService.add('OssCenter: ' + message);
  }
}
