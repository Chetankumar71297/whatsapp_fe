//this code is used to remove the error:- (Uncaught ReferenceError: process not defined) which is coming due to use of process in simple-peer library on disconnecting the video call
import * as process from "process";
window.global = window;
window.process = process;
window.Buffer = [];
