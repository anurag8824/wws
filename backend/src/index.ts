// import 'reflect-metadata'
// import { cpus } from 'node:os'
// import cluster from 'node:cluster'

// import App from './providers/App'
// import NativeEvent from './exception/NativeEvent'
// import UserSocket from './sockets/user-socket'
// import CasinoSocket from './sockets/casino-socket'

// if (cluster.isMaster) {
//   /**
//    * Catches the process events
//    */
//   NativeEvent.process()

//   /**
//    * Clear the console before the app runs
//    */
//   App.clearConsole()

//   /**
//    * Load Configuration
//    */
//   App.loadConfiguration()

//   /**
//    * Find the number of available CPUS
//    */
//   const CPUS: any = cpus()
//   /**
//    * Fork the process, the number of times we have CPUs available
//    */
//   CPUS.forEach(() => cluster.fork())

//   /**
//    * Catches the cluster events
//    */
//   NativeEvent.cluster(cluster)
//   new CasinoSocket()

// } else {
//   /**
//    * Run the Database pool
//    */
//   App.loadDatabase()

//   /**
//    * Run the Server on Clusters
//    */
//   App.loadServer()

//   new UserSocket()
// }


import 'reflect-metadata'
import { cpus } from 'node:os'
import cluster from 'node:cluster'

import App from './providers/App'
import NativeEvent from './exception/NativeEvent'
import UserSocket from './sockets/user-socket'
import CasinoSocket from './sockets/casino-socket'
import { startMatkaCron } from './crons/matka.cron'

/**
 * MASTER PROCESS
 */
if (cluster.isMaster) {
  NativeEvent.process()

  App.clearConsole()
  App.loadConfiguration()

  const CPUS = cpus()
  CPUS.forEach(() => cluster.fork())

  NativeEvent.cluster(cluster)

  // ❌ MASTER me DB / CRON nahi
  new CasinoSocket()
}

/**
 * WORKER PROCESS
 */
else {
  (async () => {
    try {
      // ✅ DATABASE FIRST
      await App.loadDatabase()
      console.log('✅ DB connected in worker', process.pid)

      // ✅ CRON AFTER DB
      startMatkaCron()
      console.log('⏱ Matka cron started')

      // ✅ SERVER
      App.loadServer()

      // ✅ SOCKET
      new UserSocket()

    } catch (error) {
      console.error('❌ Worker boot failed', error)
      process.exit(1)
    }
  })()
}

