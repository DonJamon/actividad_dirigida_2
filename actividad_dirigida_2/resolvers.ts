import { Collection, ObjectId } from "mongodb";
import { Vuelo, VueloModel } from "./types.ts";
import { formModelToVuelo } from "./utils.ts";

export const resolvers = {
  Query: {
    getFlights: async (
      _: unknown,
      __: unknown,
      context: { VuelosCollection: Collection<VueloModel> },
    ): Promise<Vuelo[]> => {
      const vuelosModel = await context.VuelosCollection.find().toArray();
      return vuelosModel.map((vueloModel) =>
        formModelToVuelo(vueloModel)
      );
    },
    getFlight: async (
      _: unknown,
      { id }: { id: string },
      context: {
        VuelosCollection: Collection<VueloModel>;
      },
    ): Promise<Vuelo | null> => {
      const vueloModel = await context.VuelosCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!vueloModel) {
        return null;
      }
      return formModelToVuelo(vueloModel);
    },
  },
  Mutation: {
    addFlight: async (
      _: unknown,
      args: { origen: string; destino: string ; fechaHora: string;},
      context: {
        VuelosCollection: Collection<VueloModel>;
      },
    ): Promise<Vuelo> => {
      const { origen, destino, fechaHora } = args;
      const { insertedId } = await context.VuelosCollection.insertOne({
        origen,
        destino,
        fechaHora,
      });
      const vueloModel = {
        _id: insertedId,
        origen,
        destino,
        fechaHora
      };
      return formModelToVuelo(vueloModel!);
    },    
  },
};