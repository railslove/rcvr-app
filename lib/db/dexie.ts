import Dexie from 'dexie' // eslint-disable-line import/no-named-as-default
import { Checkin, Guest, Owner } from './'

export class RcvrDatabase extends Dexie {
  checkins: Dexie.Table<Checkin, string>
  guests: Dexie.Table<Guest, number>
  owners: Dexie.Table<Owner, number>

  constructor() {
    super('RcvrDatabase')
    this.version(2).stores({
      checkins: 'id, enteredAt',
      guests: '++id',
      owners: 'id, email',
    })

    this.checkins = this.table('checkins')
    this.guests = this.table('guests')
    this.owners = this.table('owners')
  }
}
