import React from "react"
import troll from "../images/joker pepe.png"
export default function Header() {
    return (
        <header className="header">
            <img 
                src={troll} 
                className="header--image"
            />
            <h2 className="header--title">Meme Genie</h2>
            <h4 className="header--project">Project By{' '}
			<a
				href='https://github.com/Pranjal0301'
				target='_blank'
				>
				Pranjal 
			</a>
            </h4>
        </header>
    )
}  