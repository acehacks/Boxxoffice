import React from 'react'
import { useParams } from 'react-router-dom'
import ShowMainData from '../Components/show/ShowMainData';
import Details from "../Components/show/Details"
import Cast from "../Components/show/Cast"
import Seasons from "../Components/show/Seasons"
import { InfoBlock } from './Show.styled';
import { ShowPageWrapper } from './Show.styled';
import { useShow } from '../Misc/custom-hooks';




const Show = () => {
    // let isMounted = true;

    const {id}= useParams();
    const {show , isLoading,error}=useShow(id);
    // const [show , setShow] = useState(null);
    // const [isLoading , setIsLoading] = useState(true);
    // const [error , setError] = useState(null);
    
    if (isLoading){
        return <div>Data is being Loaded</div>
    }
    if (error){
        return <div>Error Occured : {error}</div>
    }

    return (
        <ShowPageWrapper>
            <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.genres}/>
            <InfoBlock> 
                <h2>Details</h2>
                <Details status={show.status} network={show.network} priemered={show.premiered}/>
            </InfoBlock>
            <InfoBlock>
                <h2>Seasons</h2>
                <Seasons seasons={show._embedded.seasons}/>
            </InfoBlock>
            <InfoBlock>
                <h2>Cast</h2>
                <Cast cast={show._embedded.cast}/>
            </InfoBlock>
        </ShowPageWrapper>
    )
}

export default Show
