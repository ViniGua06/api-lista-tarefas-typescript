const db = require("../db");

interface ICheck {
  script: string;
  campos: any[] | any;
}

interface UserData {
  id: number;
  nome: string;
  email: string;
  senha: string;
  idade: number;
}

interface ITasks {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: number;
  usuario_id: number;
  capa: string;
}

export default {
  check: async ({ script, campos }: ICheck) => {
    return new Promise((resolve, reject) => {
      db.query(script, campos, (error: any, result: any) => {
        if (error) {
          console.log("ola!!!!!!!!!!");
          console.log(error);
          reject(error);
        } else {
          resolve(result[0].total);
        }
      });
    });
  },

  insert: async ({ script, campos }: ICheck) => {
    return new Promise((resolve, reject) => {
      db.query(script, campos, (error: any, result: any) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(1);
        }
      });
    });
  },

  delete: async ({ script, campos }: ICheck) => {
    return new Promise((resolve, reject) => {
      db.query(script, campos, (error: any) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(1);
        }
      });
    });
  },

  getdata: async ({ script, campos }: ICheck): Promise<UserData[]> => {
    return new Promise((resolve, reject) => {
      db.query(script, campos, (error: any, result: any) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(result as UserData[]);
        }
      });
    });
  },

  getTasks: async ({ script, campos }: ICheck) => {
    return new Promise((resolve, reject) => {
      db.query(script, campos, (error: any, result: any) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
};
