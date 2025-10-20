interface FormHeaderProps {
    stepCount: number;
    totalSteps?: number;
}

const baseDashStyles = 'sm:w-12 w-6 h-1.5 inline-block';
const baseStepStyles = 'w-8 h-8 rounded-full flex items-center justify-center';

const currentStepStyles = 'bg-primary1 text-white';
const nextStepStyles = 'border-neutral-300 border text-neutral-600';

const dashPrimaryStyles = 'bg-primary1';
const dashNeutralStyles = 'bg-neutral-300';

const containerStyles = 'flex items-center gap-3';

const FormHeader = ({ stepCount, totalSteps = 4 }: FormHeaderProps) => {
    const getStepClass = (index: number) =>
        index <= stepCount ? currentStepStyles : nextStepStyles;

    const getDashColors = (index: number) => {
        if (index < stepCount) return [dashPrimaryStyles, dashPrimaryStyles];
        if (index === stepCount) return [dashPrimaryStyles, dashNeutralStyles];

        return [dashNeutralStyles, dashNeutralStyles];
    };

    const Dash = ({ index }: { index: number }) => {
        const [left, right] = getDashColors(index);

        return (
            <div className='flex'>
                <span className={`${baseDashStyles} ${left} rounded-l-lg`} />
                <span className={`${baseDashStyles} ${right} rounded-r-lg`} />
            </div>
        );
    };

    return (
        <div className='flex items-center justify-evenly mx-auto mt-10 border-b border-neutral-400 pb-5'>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className={containerStyles}>
                    <div className={`${baseStepStyles} ${getStepClass(index)}`}>
                        {index + 1}
                    </div>
                    {index < totalSteps - 1 && <Dash index={index} />}
                </div>
            ))}
        </div>
    );
};

export default FormHeader;
