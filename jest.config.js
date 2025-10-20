const config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.ts',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // must be at project root
    testMatch: ['<rootDir>/src/**/*.(test|spec).(ts|tsx)'],
    clearMocks: true,
};

export default config;
