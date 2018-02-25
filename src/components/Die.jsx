import React from 'react'

const Die = function (props) {
  const symbolToFile = (symbol) => {
    if (symbol === 'S') {
      return './img/Success.png'
    } else if (symbol === 'A') {
      return './img/Advantage.png'
    } else if (symbol === 'T') {
      return './img/Triumph.png'
    } else if (symbol === 'F') {
      return './img/Failure.png'
    } else if (symbol === 'H') {
      return './img/Threat.png'
    } else if (symbol === 'D') {
      return './img/Despair.png'
    }
    
    return './img/Blank.png'
  }

  const type = props.type
  const wrapperStyle = {}
  const imgStyle = {}

  if (type === 'boost') {
    wrapperStyle.background = '#4ECBF5'
  } else if (type === 'ability') {
    wrapperStyle.background = '#00D134'
  } else if (type === 'proficiency') {
    wrapperStyle.background = '#E8C917'
  } else if (type === 'setback') {
    wrapperStyle.background = '#1A1A1A'
  } else if (type === 'difficulty') {
    wrapperStyle.background = '#C700C7'
  } else if (type === 'challenge') {
    wrapperStyle.background = '#7A0000'
  }
  
  if (props.inverted) {
    imgStyle.filter = 'invert(100%)'
  }

  const die = {
    url: symbolToFile(props.face), // `https://via.placeholder.com/50x50?text=${props.face}`,
    alt: `${props.type}@${props.face}`
  }

  return (
    <div className="Die" style={wrapperStyle}>
      <img src={die.url} alt={die.alt} width={100} height={100} style={imgStyle} />
    </div>
  )
}

export default Die
