import React, { Component } from "react";
import axios from "axios";
import { token } from "../config";

const EventosContext = React.createContext();
export const EventosConsumer = EventosContext.Consumer;

class EventosProvider extends Component{
  state = {
    eventos: []
  }

  ordenar = "date"

  obtenerEventos = async ({nombre, categoria}) => {
    let url = `https://www.eventbriteapi.com/v3/events/search/?token=${token}&q=${nombre}&categories=${categoria}&sort_by=${this.ordenar}&locale=es_ES`;

    const res = await axios.get(url);

    const { data: { events: eventos } } = res;

    this.setState({eventos})

  }

  render(){
    return (
      <EventosContext.Provider
        value={{
          eventos: this.state.eventos,
          obtenerEventos: this.obtenerEventos
        }}
      >
        {this.props.children}
      </EventosContext.Provider>
    );
  }
}

export default EventosProvider;