export function cors(req: Request, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, Origin, Device, user.login, User-Agent, user.password, skiploading, skiperror, token"
    );
    res.header("Access-Control-Allow-Methods", "POST,PUT,DELETE,GET,OPTIONS");
  
    if (req.method === "OPTIONS") {
      res.status(200).send();
      return;
    }
    next();
  }
  