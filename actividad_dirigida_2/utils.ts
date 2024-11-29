import { Vuelo, VueloModel } from "./types.ts";

export const formModelToVuelo = (vueloModel: VueloModel): Vuelo => {
  return {
    id: vueloModel._id!.toString(),
    destino: vueloModel.destino,
    origen: vueloModel.origen,
    fechaHora: vueloModel.fechaHora,
  };
};