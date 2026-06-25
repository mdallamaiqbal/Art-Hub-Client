import React from 'react';
import ArtSubmissionForm from './ArtSubmissionForm';
import { getUserSession } from '@/lib/core/session';

const AddArtworkPage =async() => {
    const user = await getUserSession()
    return (
        <div>
            <ArtSubmissionForm artist={user} />
        </div>
    );
};

export default AddArtworkPage;