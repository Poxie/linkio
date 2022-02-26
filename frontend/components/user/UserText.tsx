import React from 'react';

export const UserText: React.FC<{username: string, name?: string, bio?: string}> = ({ name, bio }) => {
    return(
        <div>
            {name}

            {bio && (
                <div>
                    {bio}
                </div>
            )}
        </div>
    )
}