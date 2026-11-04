import React, { useState, useEffect } from 'react';
import flashcardService from '../../services/flashcardService';
import PageHeader from '../../components/common/PageHeader';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';
import FlashcardSetCard from '../../components/Flashcards/FlashcardSetCard';
import toast from 'react-hot-toast';

const FlashcardsListPage = () => {

    const [flashcardSets, setFlashcardSets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlashcardSets = async () => {
            try {
                const response = await flashcardService.getAllFlashcardSets();
                console.log("fetchFlashcardSets____", response.data);
                setFlashcardSets(response.data);
            } catch (error) {
                toast.error("Failed to fetch flashcard sets");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchFlashcardSets();
    }, [])

    const renderContent = () => {
        if (loading) {
            return <Spinner />
        }

        if (flashcardSets.length === 0) {
            return (
                <EmptyState
                    title="No flashcard sets found"
                    description="You haven't created any flashcard sets yet. Start by creating a new set to begin your learning journey!"
                />
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {flashcardSets.map((set) => (
                    <FlashcardSetCard key={set._id} flashcardSet={set} />
                ))}
            </div>
        );
    }

    return (
        <div>
            <PageHeader title="All Flashcard sets" />
            {renderContent()}
        </div>
    )
}

export default FlashcardsListPage
