export class AgeModifier {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
  constructor(id?: string, desciption?: string) {

        this.id = id;
        this.description = desciption;
    }

    public id?: string;
    public description?: string;
    public enabled: boolean = true;
}


