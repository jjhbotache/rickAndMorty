import { Character } from "../../models/interfaces";
import CharacterCard from "../CharacterCard/CharacterCard";

interface Props{
  characters:Character[]
}
export default function Cards({characters}:Props) {
  return (
    (characters.length>0) 
                ? (characters.map((character:Character) => {
                  return <CharacterCard key={character.id} character={character}></CharacterCard>
                    }))
                :
                // no characters found
                <div className="d-flex justify-content-center align-items-center">
                  <h1 className="text-center text-muted">No Characters Found</h1>
                </div>
  )
};
