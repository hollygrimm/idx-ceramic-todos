import { Injectable, Inject } from '@angular/core';

import { Observable, from, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import type { CeramicApi } from '@ceramicnetwork/common';
import { IDX } from '@ceramicstudio/idx';
import DocID from '@ceramicnetwork/docid';

import { CeramicToken, IDXWrapper, IdxWrapperToken } from '../../core/services/tokens';
import { TaskWrapperModel } from '../models';
import { schemas } from '../../../config.json'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(@Inject(CeramicToken) private ceramic: CeramicApi,
    @Inject(IdxWrapperToken) private idxWrapper: IDXWrapper) { }

  public testCeramic() {
    console.log(`ceramic called ${this.ceramic.did}`);
  }

  public createTask(task: any): Observable<TaskWrapperModel> {
    console.log('create task called ' + this.ceramic.did.toString());
    return from(this.ceramic.createDocument('tile', {
      content: { task },
      metadata: { controllers: [this.idxWrapper.value.id], schema: schemas.Task },
    })).pipe(
      map((response) => {
        return {
          id: "ceramic://" + response.id.toString(),
          title: task.title,
          text: task.text,
          date: task.date,
          completed: task.completed
        }
      })
    )
  }

  public appendTask(task: TaskWrapperModel): Observable<TaskWrapperModel[]> {
    return from(this.idxWrapper.value.get<{ tasks: TaskWrapperModel[] }>('tasks')).pipe(
      map(arr => {
        if (arr === null) {
          arr = { tasks: [] }
        }
        return [task].concat(arr.tasks);
      })
    );
  }

  public setTasks(tasks: TaskWrapperModel[]): Observable<DocID> {
    return from(this.idxWrapper.value.set('tasks', { tasks: tasks })).pipe(
      tap((response) => console.log(`setTasks: ${response}`))
    );
  }

  public getTaskList(): Observable<TaskWrapperModel[]> {
    let arr: Array<TaskWrapperModel> = [];

    return from(this.idxWrapper.value.get<{ tasks: TaskWrapperModel[] }>('tasks')).pipe(
      map(arr => arr?.tasks ?? [] )
    );
  }

}
