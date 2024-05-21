import React, { useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import CompatibilityChecker from '../CompatibilityChecker';
import ContactForm from './ContactForm';
import BirthdateCalculator from './BirthdayCalculator';

const Main: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<string>('');

    const [activeTab, setActiveTab] = useState<'BirthdateCalculator' | 'CompatibilityChecker' | 'MonthsaryChecker'>('BirthdateCalculator');

    const handleTabChange = (tab: 'BirthdateCalculator' | 'CompatibilityChecker' | 'MonthsaryChecker') => {
        setActiveTab(tab);
    };

    const handleNavigate = (page: string) => {
        setCurrentPage(page);
    };

    let content = null;
    if (currentPage === 'contact') {
        content = <ContactForm />;
    } else {
        switch (activeTab) {
            case 'BirthdateCalculator':
                content = <BirthdateCalculator />;
                break;
            case 'CompatibilityChecker':
                content = <CompatibilityChecker />;
                break;
            // Add cases for other tabs if needed
            default:
                content = null;
                break;
        }
    }

    const Tab = () => {
        if (currentPage === 'contact') {
            return null; // Hide tabs when on contact page
        }
        return (
            <div className="tabs tabs-lifted max-w-md mx-auto" role="tablist">
                <button
                    role="tab"
                    className={`tab ${activeTab === 'BirthdateCalculator' ? 'tab-active' : ''}`}
                    onClick={() => handleTabChange('BirthdateCalculator')}
                    style={{ borderColor: activeTab === 'BirthdateCalculator' ? 'gray' : 'transparent' }}
                >
                    B-Date Calculator
                </button>
                <button
                    role="tab"
                    className={`tab ${activeTab === 'CompatibilityChecker' ? 'tab-active' : ''}`}
                    onClick={() => handleTabChange('CompatibilityChecker')}
                    style={{ borderColor: activeTab === 'CompatibilityChecker' ? 'gray' : 'transparent' }}
                >
                    Compatibility
                </button>
                <button
                    role="tab"
                    className={`tab ${activeTab === 'MonthsaryChecker' ? 'tab-active' : ''}`}
                    style={{ borderColor: activeTab === 'MonthsaryChecker' ? 'gray' : 'transparent' }}
                    onClick={() => handleTabChange('MonthsaryChecker')}
                >
                    M Checker
                </button>
            </div>
        );
    };

    return (
        <div>
            <NavBar onNavigate={handleNavigate} />
            <Tab />
            <div>
                {content}
            </div>
            <Footer />
        </div>
    );
};

export default Main;
