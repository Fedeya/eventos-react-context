import React, { Component } from "react";
import axios from "axios";
import { token } from "../config";

const CategoriasContext = React.createContext();
export const CategoriasConsumer = CategoriasContext.Consumer;

class CategoriasProvider extends Component{

  state = {
    categorias: []
  }

  componentDidMount(){
    this.obtenerCategorias();
  }

  obtenerCategorias = async () => {
    let url = `https://www.eventbriteapi.com/v3/categories/?token=${token}&locale=es_ES`

    let res = await axios.get(url);
    
    let { data: { categories: categorias } } = res;

    this.setState({categorias});

  }

  render(){
    return (
      <CategoriasContext.Provider
        value={{
          categorias: this.state.categorias
        }}
      >

        {this.props.children}

      </CategoriasContext.Provider>
    );
  }
}

export default CategoriasProvider;