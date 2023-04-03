import { addRxPlugin, createRxDatabase } from 'rxdb'

import { RxDBReplicationFirestorePlugin } from 'rxdb/plugins/replication-firestore'

addRxPlugin(RxDBReplicationFirestorePlugin)
// also create your RxDatabase and RxCollection.
