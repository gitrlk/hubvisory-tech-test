export class Actor {
  name: string;
  profilePicturePath: string | null;
  constructor(name = "", profilePicturePath = "") {
    this.name = name;
    this.profilePicturePath = profilePicturePath;
  }
}
