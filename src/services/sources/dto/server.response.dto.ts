export class ServerResponse {
  name: string;
  hash: string;

  constructor(name: string, hash: string) {
    this.name = name;
    this.hash = hash;
  }
}
