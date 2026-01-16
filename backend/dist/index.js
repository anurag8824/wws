"use strict";
// import 'reflect-metadata'
// import { cpus } from 'node:os'
// import cluster from 'node:cluster'
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
require("reflect-metadata");
const node_os_1 = require("node:os");
const node_cluster_1 = __importDefault(require("node:cluster"));
const App_1 = __importDefault(require("./providers/App"));
const NativeEvent_1 = __importDefault(require("./exception/NativeEvent"));
const user_socket_1 = __importDefault(require("./sockets/user-socket"));
const casino_socket_1 = __importDefault(require("./sockets/casino-socket"));
const matka_cron_1 = require("./crons/matka.cron");
/**
 * MASTER PROCESS
 */
if (node_cluster_1.default.isMaster) {
    NativeEvent_1.default.process();
    App_1.default.clearConsole();
    App_1.default.loadConfiguration();
    const CPUS = (0, node_os_1.cpus)();
    CPUS.forEach(() => node_cluster_1.default.fork());
    NativeEvent_1.default.cluster(node_cluster_1.default);
    // ❌ MASTER me DB / CRON nahi
    new casino_socket_1.default();
}
/**
 * WORKER PROCESS
 */
else {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // ✅ DATABASE FIRST
            yield App_1.default.loadDatabase();
            console.log('✅ DB connected in worker', process.pid);
            // ✅ CRON AFTER DB
            (0, matka_cron_1.startMatkaCron)();
            console.log('⏱ Matka cron started');
            // ✅ SERVER
            App_1.default.loadServer();
            // ✅ SOCKET
            new user_socket_1.default();
        }
        catch (error) {
            console.error('❌ Worker boot failed', error);
            process.exit(1);
        }
    }))();
}
//# sourceMappingURL=index.js.map