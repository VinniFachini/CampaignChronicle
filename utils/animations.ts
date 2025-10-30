
export const fadeInUp = {
    initial: {
        opacity: 0,
        y: 20
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 600,
            ease: 'easeOut'
        }
    }
}

export const fadeIn = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 1,
        transition: {
            duration: 800,
            ease: 'easeOut'
        }
    }
}

export const staggerContainer = {
    initial: {},
    enter: {
        transition: {
            staggerChildren: 0.1
        }
    }
}