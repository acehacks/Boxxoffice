import React from 'react'
import MainPageLayout from '../Components/MainPageLayout'
import { useState } from 'react'
import { apiGet } from '../Misc/Config'
import ActorGrid from '../Components/actor/ActorGrid'
import ShowGrid from '../Components/show/ShowGrid'
import { useLastQuery } from '../Misc/custom-hooks'
import { RadioInputsWrapper } from './Home.styled'
import { SearchInput } from './Home.styled'
import { SearchButtonWrapper } from './Home.styled'
import CustomRadio from '../Components/CustomRadio'

const Home = () => {
    const [input , setInput] =useLastQuery();
    const [results , setResults] =useState(null);
    const [searchOption , setSearchOption] =useState('shows');
    const isShowsSearch = searchOption==='shows';

    const onInputChange=(ev)=>{
        setInput(ev.target.value);
    }
    
    const onSearch=()=>{
        apiGet(`/search/${searchOption}?q=${input}`).then(result=>{
            setResults(result);
        })
        // fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r=>r.json()).then(result=>{
        //     setResults(result);
        //     console.log(result);
        // })
    }
    const onKeyDown=ev=>{
        if (ev.keyCode===13){
            onSearch();
        }
    }
    const renderResults=()=>{
        if (results && results.length===0){
            return <div>No Result</div>
        }
        if (results && results.length>0){
            return results[0].show?(
                <ShowGrid data={results}/>
            ):
            // results.map((item)=><div key = {item.show.id}>{item.show.name}</div>)
            (
                <ActorGrid data={results}/>
            );
        }
        return null;
    }
    const onRadioChange=(ev)=>{
        setSearchOption(ev.target.value);
    };
    // console.log(searchOption);
    return (
        <MainPageLayout>
            <SearchInput type="text" placeholder="Search for Something" onChange={onInputChange} value={input} onKeyDown={onKeyDown}></SearchInput>
            <RadioInputsWrapper>
                <div>
                    <CustomRadio
                        label="Shows" id="shows-search" value="shows" checked={isShowsSearch} onChange={onRadioChange}
                    />
                </div>
                
                <div>
                    <CustomRadio
                            label="Actors" id="actors-search" value="people" checked={!isShowsSearch} onChange={onRadioChange}
                     />
                    {/* <label htmlFor="actors-search">
                        Actors
                        <input id="actors-search" type="radio" value="people" checked={!isShowsSearch} onChange={onRadioChange} />
                    </label> */}
                </div>
            </RadioInputsWrapper>
            <SearchButtonWrapper>
                <button type="button" onClick={onSearch} > Search </button>
            </SearchButtonWrapper>
            
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home
