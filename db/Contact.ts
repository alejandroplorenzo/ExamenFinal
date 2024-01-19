import mongoose from "mongoose";
import {Contact} from "../types.ts";

const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        nombreApellido: {type: String, required: true},
        telefono: {type: String, required: true},
        Pais: {type: String, required: true},
        horaActual: {type: String, required: false},
        net_worth: {type: String, required: true},
        gender: {type: String, required: true},
        occupation: {type: String, required: true},
        height: {type: String, required: true},
        birthday: {type: String, required: true},
    }
);

export type contactModelType = mongoose.Document & Omit<Contact, "id">;

contactSchema.path("telefono").validate(async function (telefono: String){
    try{
        const alreadyExists = contactModel.findOne(telefono);
        if(!alreadyExists){
            return true;
        }
        return false;

    }catch(error){
        return error;
    }
});

/*contactSchema.post("findOneAndDelete", async function (doc: contactModelType){
    await mongoose.models.Contact.deleteMany();
});*/

export const contactModel = mongoose.model<contactModelType>("Contact", contactSchema);