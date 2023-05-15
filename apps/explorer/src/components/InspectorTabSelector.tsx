import { NavLink, useSearchParams } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect } from "react";

export enum View {
    Pretty = 'Pretty',
    Hex = 'Hex',
    Base64 = 'Base64',
    JSON = 'JSON'
}

const SearchParamKey = 'view';

export type InspectoTabSelectorProps = {
    current: View
}

export function useCurrentView() {
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        if (!searchParams.get(SearchParamKey)) {
            setSearchParams({ [SearchParamKey]: View.Pretty });
        }
    }, [searchParams])
    return searchParams.get(SearchParamKey) as View || View.Pretty;
}

export function InspectoTabSelector({ current }: InspectoTabSelectorProps) {
    return (
        <ToggleButtonGroup size="small" fullWidth>
            {Object
                .values(View)
                .map((tabItem) => (
                    <ToggleButton
                        key={tabItem} 
                        disabled={current === tabItem} 
                        component={NavLink} 
                        to={`?${SearchParamKey}=${tabItem}`} 
                        value={tabItem}>
                            {tabItem}
                    </ToggleButton>
                ))
            }
        </ToggleButtonGroup>
    )
}