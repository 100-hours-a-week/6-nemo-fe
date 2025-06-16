import JSConfetti from 'js-confetti';
import { useEffect, useRef } from 'react';

export const useConfetti = () => {
    const confettiRef = useRef<JSConfetti | null>(null);

    useEffect(() => {
        confettiRef.current = new JSConfetti();
        return () => {
            confettiRef.current = null;
        };
    }, []);

    const confetti = (duration: number = 3000) => {
        if (!confettiRef.current) return;

        confettiRef.current.addConfetti({ confettiNumber: 200 });

        const interval = setInterval(() => {
            if (confettiRef.current) {
                confettiRef.current.addConfetti({ confettiNumber: 100 });
            }
        }, 1000);

        setTimeout(() => clearInterval(interval), duration);
    };

    return confetti;
};
