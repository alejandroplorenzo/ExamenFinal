import { GraphQLError } from "graphql";
import {contactModel, contactModelType} from "../db/Contact.ts";
import mongoose from "mongoose";
import getDatosAPI from "../lib/APIfamosos.ts";
//import idate_and_time from "";

export const Mutation = {

    addContact: async(_:unknown, args: {
        nombreApellido: string; telefono: string
    }):Promise<contactModelType> => {
        const {nombreApellido} = args;
        const exists = await contactModel.exists({nombreApellido});
        const {
            net_worth, gender, nationality, occupation, height, birthday
        } = await getDatosAPI(nombreApellido);
        const contact = (
            {
                nombreApellido: args.nombreApellido,
                telefono: args.telefono,
                Pais: nationality,
                net_worth: net_worth,
                gender: gender,
                occupation: occupation,
                height: height,
                birthday: birthday,
            }
        );
        const newContact = await contactModel.create(contact);
        await newContact.save();
        return newContact;

    },
    getContact: async(_:unknown, args: {id: string}):Promise<contactModelType>=>{
        const {id} = args;
        const contact = await contactModel.findById(id);
        if(!contact){
            throw new GraphQLError(`Contacto no encontrado`, {extensions: {code: "NOT FOUND"},});
        }

        const {
            net_worth, gender, nationality, occupation, height, birthday
        } = await getDatosAPI(contact.nombreApellido);

        const contactData = {
            id,
            nombreApellido: contact.nombreApellido,
            telefono: contact.telefono,
            Pais: nationality,
            net_worth: net_worth,
            gender: gender,
            occupation: occupation,
            height: height,
            birthday: birthday,
        };
        const Contact = await contactModel.create(contact);
        await Contact.save();
        return Contact;

    },
    getContacts: async(_:unknown, args:undefined):Promise<Array<contactModelType>>=>{
        const contacts = await contactModel.find();
        if(!contacts){
            throw new GraphQLError(`Contacto no encontrado`, {extensions: {code: "NOT FOUND"},});
        }
        return contacts;
    },
    deleteContact: async(_:unknown, args: {id: string}):Promise<Boolean>=>{
        const contact = await contactModel.findByIdAndDelete(args.id).exec();
        if(!contact){
            return false;
            //throw new GraphQLError(`Contacto no encontrado`, {extensions: {code: "NOT FOUND"}});
        }
        return true;
    },
    updateContact:async(_:unknown, args: {id: string; nombreApellido: string, telefono: string}):Promise<contactModelType>=>{
        const {nombreApellido} = args;
        const {
            net_worth, gender, nationality, occupation, height, birthday
        } = await getDatosAPI(nombreApellido);

        const contact = await contactModel.findByIdAndUpdate(
            args.id,
            {
                nombreApellido: args.nombreApellido,
                telefono: args.telefono,
                Pais: nationality,
                net_worth: net_worth,
                gender: gender,
                occupation: occupation,
                height: height,
                birthday: birthday,
            },
            {new: true, runValidators: true}
        );
        if(!contact){
            throw new GraphQLError(`Contacto no encontrado`, {extensions: {code: "NOT FOUND"},});
        }

        return contact;
    }
};

