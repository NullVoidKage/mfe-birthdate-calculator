import React, { useState, useEffect } from 'react';

const BirthdayCountdown: React.FC<{ birthDate: string }> = ({ birthDate }) => {
    const [countdown, setCountdown] = useState<string>('');

    useEffect(() => {
        const calculateCountdown = () => {
            if (birthDate) {
                const today = new Date();
                const birthDateObject = new Date(birthDate);

                // Adjust birth year if the birth date has already passed in the current year
                if (today.getTime() > birthDateObject.getTime()) {
                    birthDateObject.setFullYear(today.getFullYear() + 1);
                }

                // Calculate time difference between today and next birthday
                const timeDiff = birthDateObject.getTime() - today.getTime();
                const daysRemaining = Math.floor(timeDiff / (1000 * 3600 * 24));
                const hoursRemaining = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
                const minutesRemaining = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
                const secondsRemaining = Math.floor((timeDiff % (1000 * 60)) / 1000);

                // Update the state with the countdown
                setCountdown(`${daysRemaining} days ${hoursRemaining} hours ${minutesRemaining} minutes ${secondsRemaining} seconds until your next birthday!`);
            }
        };

        calculateCountdown();

        const interval = setInterval(calculateCountdown, 1000);

        return () => clearInterval(interval);
    }, [birthDate]);

    return (
        <div className="max-w-md mx-auto mb-10 shadow rounded-lg p-4 text-center"> {/* Center align the "Birthday Countdown" section */}
            <h2 className="text-3xl font-bold mb-4">My Next Birthday</h2>
            <div className="flex justify-center"> {/* Center align the countdown */}
                <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                            {countdown.split(' ')[0].padStart(2, '0')}
                        </span>
                        days
                    </div>
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl" style={{ "--value": parseInt(countdown.split(' ')[2]) || 0 } as React.CSSProperties}>
                            <span></span>
                        </span>
                        hours
                    </div>
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl" style={{ "--value": parseInt(countdown.split(' ')[4]) || 0 } as React.CSSProperties}>
                            <span></span>
                        </span>
                        minutes
                    </div>
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl" style={{ "--value": parseInt(countdown.split(' ')[6]) || 0 } as React.CSSProperties}>
                            <span></span>
                        </span>
                        seconds
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BirthdayCountdown;
