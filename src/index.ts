import App from "./app";
import express from "express";
import configs from "./configs";

/*******************************************************
 * APPLICATION MAIN
 *******************************************************/

const main = async () => {
  const app = new App(express(), Number(configs.PORT));
  await app.initialize();
  app.checkDependencies();

  app.run();
};

/*******************************************************
 * RUN APPLICATION
 *******************************************************/

main().catch(console.log);
