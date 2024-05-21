import React, { useState } from 'react';
import axios from 'axios';
import BirthdayCountdown from './BirthdayCountdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const BirthdateCalculator: React.FC = () => {
    const [birthDate, setBirthDate] = useState<string>(''); // Set birthDate as string type
    const [ageData, setAgeData] = useState<{
        years: number;
        months: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        weeks: number;
        centuries: number;
        decades: number;
        dayOfWeek: string;
        generation: string;

    }>({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        weeks: 0,
        centuries: 0,
        decades: 0,
        dayOfWeek: '',
        generation: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [zodiacSign, setZodiacSign] = useState<{ name: string; description: string }>({ name: '', description: '' });

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!birthDate) {
            setError('Please enter your birth date before clicking "Calculate".');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/calculate', { birthDate });
            const data = response.data;
            setAgeData({
                years: data.years,
                months: data.months,
                days: data.days,
                hours: data.hours,
                minutes: data.minutes,
                seconds: data.seconds,
                weeks: data.weeks,
                centuries: data.centuries,
                decades: data.decades,
                dayOfWeek: data.dayOfWeek,
                generation: data.generation
            });
            setError(null);
            console.log(data.generation)
            setZodiacSign({ name: data.zodiacSign, description: '' }); // Assuming description is not provided by the API
        } catch (error: any) {
            setError('Error occurred while fetching data.');
        }
    };

    const getZodiacSignImage = (signName: string) => {
        switch (signName.toLowerCase()) {
            case 'aries':
                return 'https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/2648.svg';
            case 'taurus':
                return 'https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/2649.svg';
            case 'gemini':
                return 'https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/264a.svg';
            case 'cancer':
                return 'https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/264b.svg';
            case 'leo':
                return 'https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/264c.svg';
            case 'virgo':
                return 'https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/264d.svg';
            case 'libra':
                return 'https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/264e.svg';
            case 'scorpio':
                return 'https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/264f.svg';
            case 'sagittarius':
                return 'https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/2650.svg';
            case 'capricorn':
                return 'https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/2651.svg';
            case 'aquarius':
                return 'https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/2652.svg';
            case 'pisces':
                return 'https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/2653.svg';
            default:
                return ''; // Return empty string or default image URL
        }
    };


    const Calculator = () => {
        return (
            <section className="p-6 flex flex-col items-center justify-center">
                <h2 className="text-center text-3xl font-bold  text-gray-400">Birthdate Calculator!</h2>
                <p className="text-center text-gray-500 mb-8">Find out your zodiac sign, age, and more with our easy-to-use calculator.</p>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col items-center">
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-500 font-bold mb-2">
                            Enter your birth date:
                        </label>
                        <DatePicker
                        id="date"
                        selected={birthDate ? new Date(birthDate) : null} // Convert birthDate to Date object or set to null
                        onChange={(date: Date | null) => {
                            const formattedDate: string = date ? date.toISOString().split('T')[0] : ""; // Format date as string
                            setBirthDate(formattedDate);
                        }}
                        placeholderText="Select Date" // Add placeholder text
                        className="input input-bordered w-full mt-2 p-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
                    />
                    </div>

                    <button onClick={handleSubmit} className="btn btn-primary mb-4" style={{ width: '100%', padding: '0.75rem', minHeight: '2.75rem' }}>
                        Calculate
                    </button>


                </form>
                {error && <p className="text-center text-red-500 mb-4">{error}</p>}

            </section>
        );
    };


    const ZodiacSign = () => {
        return (
            <div>
                {zodiacSign.name && (

                    <div className="flex justify-center mb-10 items-center">
                        <div className="card card-side bg-base-1000 shadow-xl w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
                            <div className="flex justify-center items-center h-full">
                                <div className="flex flex-col items-center">
                                    <figure className="flex items-center justify-center mb-4" style={{ paddingTop: '50%' }}>
                                        {zodiacSign.name && (
                                            <img src={getZodiacSignImage(zodiacSign.name)} alt="Zodiac Sign" className="w-48 h-auto object-cover" />
                                        )}
                                    </figure>
                                    {zodiacSign.name && (
                                        <>
                                            <p className="text-2xl font-bold mt-2">{zodiacSign.name}</p>
                                            <h3 className="text-1xl font-bold text-gray-600">{birthDate}</h3>
                                            <p className="text-1xl font-bold text-gray-600">{ageData.generation}</p>
                                        </>


                                    )}
                                </div>
                            </div>

                            <div className="card-body flex flex-col items-center justify-center">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col border-gray-300 pl-4">
                                        <p className="text-gray-600 mb-2">Years: <span className="text-neutral-content">{ageData.years}</span></p>
                                        <p className="text-gray-600 mb-2">Days: <span className="text-neutral-content">{ageData.days.toLocaleString()}</span></p>
                                        <p className="text-gray-600 mb-2">Minutes: <span className="text-neutral-content">{ageData.minutes.toLocaleString()}</span></p>
                                        <p className="text-gray-600 mb-2">Weeks: <span className="text-neutral-content">{ageData.weeks.toLocaleString()}</span></p>
                                        <p className="text-gray-600 mb-2">Months: <span className="text-neutral-content">{ageData.months.toLocaleString()}</span></p>
                                        <p className="text-gray-600 mb-2">Hours: <span className="text-neutral-content">{ageData.hours.toLocaleString()}</span></p>
                                        <p className="text-gray-600 mb-2">Seconds: <span className="text-neutral-content">{ageData.seconds.toLocaleString()}</span></p>
                                        <p className="text-gray-600 mb-2">Birthday: <span className="text-neutral-content">{ageData.dayOfWeek}</span></p>

                                    </div>
                                </div>
                                <div className="flex justify-end mt-6">
                                    <button className="btn btn-primary mb-4">Save Analysis</button>
                                </div>
                            </div>

                        </div>
                    </div>

                )}
            </div>
        )
    }

    return (
        <div>
            <Calculator />
            <BirthdayCountdown birthDate={birthDate} /> {/* Render the BirthdayCountdown component */}
            <ZodiacSign />
        </div>
    );
};

export default BirthdateCalculator;