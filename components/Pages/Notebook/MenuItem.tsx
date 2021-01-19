import { ChevronDownIcon } from '@primer/octicons-react';
import React, { useState } from 'react';
import ActiveLink from '../../ActiveLink';


export const MenuItem: React.FC<{
    hasExpanded: boolean;
    title: string;
    url?: string;
}> = props => {
    const [opened, toggleOpened] = useState(false);
    // const router = useRouter();

    // useEffect(() => {
    //     toggleOpened(false);
    // }, [router.asPath]);

    return props.hasExpanded ? (
        <>
            <label htmlFor={encodeURIComponent(props.title)} className="flex justify-between cursor-pointer items-center">
                {props.title}
                <ChevronDownIcon />
            </label>

            <input id={encodeURIComponent(props.title)}
            className="menuItemLabel"
            type="checkbox"
            onChange={x => toggleOpened(x.target.checked)}
            checked={opened} 
            />

            <style jsx>{`
            :global(.menuItemLabel) {
                display: none;
            }
            :global(.menuItemLabel:checked ~ ul) {
                display: block;
            }
            `}</style>
        </>) : 
            props.url? 
                <>
                    <ActiveLink href={props.url}>
                        <a>{props.title}</a>
                    </ActiveLink>
                </>: 
                <>{props.title}</>
};
