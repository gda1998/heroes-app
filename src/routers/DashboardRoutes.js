import { Routes, Route, Navigate } from 'react-router';

import { Navbar } from '../components/ui/Navbar';
import { DcScreen } from '../components/dc/DcScreen';
import { HeroScreen } from '../components/heroes/HeroScreen';
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { SearchScreen } from '../components/search/SearchScreen';

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-2">
                <Routes>
                    <Route path="/hero/:heroId" element={ <HeroScreen /> } />
                    <Route path="/marvel" element={ <MarvelScreen /> } />
                    <Route path="/dc" element={ <DcScreen /> } />
                    <Route path="/search" element={ <SearchScreen /> } />
                    <Route path="/" element={ <MarvelScreen /> } />
                    <Route path="/*" element={ <Navigate to="/" replace /> } />
                </Routes>
            </div>   
        </>
    )
}
