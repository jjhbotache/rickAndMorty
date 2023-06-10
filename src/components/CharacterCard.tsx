import { type Character } from "../models/interfaces";

interface CharacterCardProps {
  character: Character;
}
function CharacterCard({character}:CharacterCardProps):JSX.Element{
  // console.log("character recibed",character);
  
  return (
      <div className="card col-12 col-md-6 col-lg-4  d-flex justify-content-center">
            <div className="col-12 col-sm-4">
              <img src={character.image} className="card-img img-fluid" alt="Imagen"/>
            </div>
          <div className="col-12 col-sm-8">
            <div className="card-body h-100 d-flex flex-column justify-content-center">
              <h5 className="card-title">{character.name}</h5>
              <p className="card-text">{character.status}</p>
            </div>
          </div>
      </div>
  );
};

export default CharacterCard;

