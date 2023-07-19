import { useState, FormEvent } from 'react'
import './App.css'
import logoImg from './assets/logo.png'

interface InfoProps{
  title: string;
  gasolina: number | string;
  alcool: number | string;
}

function App() {

  const [gasolinaInput, setGasolinaInput] = useState<number>(0);
  const [alcoolInput, setAlcoolInput] = useState<number>(0);
  const [info, setInfo] = useState<InfoProps>();

  function calculate(event: FormEvent){
    event.preventDefault();
    const result: number = alcoolInput / gasolinaInput;
    
    if(result <= 0.7){
      setInfo({
        title: "Compensar Abastecer com Álcool",
        gasolina: formatter(gasolinaInput),
        alcool: formatter(alcoolInput)
      });

    } else {
    setInfo({
      title: "Compensa Abastecer com Gasolina",
      gasolina: formatter(gasolinaInput),
      alcool: formatter(alcoolInput)
    });
    }
  }

  function formatter(value: number ){
    const formattedValue = value.toLocaleString("pt-pt", 
    {
      style: "currency",
      currency: "EUR"
    });
  
    return formattedValue;
  }


  return (
    <div>
      <main className='container'>
        <img  className='logo' src={logoImg} alt="Logo"/>
        <h1 className='title'> Qual melhor opção</h1>
        <form className='form' onSubmit={calculate}>
          <label>Álcool (Preço por litro):</label>
          <input
            className='input'
            type='number'
            placeholder='4,90 EUR'
            min="1"
            step="0.01"
            required 
            value={alcoolInput}
            onChange={ (e) => setAlcoolInput(Number(e.target.value))}
          />
          <label>Gasolina (Preço por litro):</label>
          <input
            className='input'
            type='number'
            placeholder='4,90 EUR'
            min="1"
            step="0.01"
            required 
            value={gasolinaInput}
            onChange={ (e) => setGasolinaInput(Number(e.target.value))}
          />
          <input className='button'  type="submit" value="Calcular"/>
        </form>

        {info && Object.keys(info).length > 0 && (
            <section className='result'>
            <h2 className='result-title'>Compensa usar { info.title }</h2>
            <span>Álcool { info.alcool }</span>
            <span>Gasolina { info.gasolina }</span>
          </section>
        )}

      </main>
    </div>
  )
}

export default App
