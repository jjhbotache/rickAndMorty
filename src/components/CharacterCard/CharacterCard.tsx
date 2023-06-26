import { type Character } from "../../models/interfaces";

interface CharacterCardProps {
  character: Character;
}
function CharacterCard({character}:CharacterCardProps):JSX.Element{
  // console.log("character recibed",character);
  
  return (
      <div className="col-12 col-md-6 col-lg-4  d-flex justify-content-center" style={{
        minWidth: "300px"
      }} >
        <div className="card">
            <div className="col-12">
              <img src={character.image} className="card-img img-fluid" alt="Imagen"/>
            </div>
            <div className="col-12">
              <div className="card-body h-100 d-flex flex-column justify-content-center">
                <h5 className="card-title">{character.name}</h5>
                <h6><strong>Status: &nbsp;</strong> <span className="card-text">{character.status}</span> </h6>
                <h6><strong>species: &nbsp;</strong> <span className="card-text">{character.species}</span> </h6>
                <h6><strong>gender: &nbsp;</strong> <span className="card-text">{character.gender}</span> </h6>
                
              </div>
            </div>
        </div>
      </div>
  );
};

export default CharacterCard;

