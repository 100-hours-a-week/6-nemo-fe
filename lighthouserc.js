module.exports = {
    ci: {
        collect: {
            staticDistDir: "./.next",
            startServerCommand: "pnpm start",
            startServerReadyPattern: "Ready on",
            startServerReadyTimeout: 30000,
            url: [
                'http://localhost:3000/groups',
                'http://localhost:3000/login',
                'http://localhost:3000/my-nemo?tab=group',
                'http://localhost:3000/my-nemo?tab=schedule',
                'http://localhost:3000/my-profile',
            ],
            numberOfRuns: 3, // 각 URL당 3번 실행하여 평균값 계산
            settings: {
                preset: 'desktop',
            },
        },
        assert: {
            assertions: {
                'categories:performance': ['warn', { minScore: 0.9 }],
                'categories:accessibility': ['warn', { minScore: 0.9 }],
                'categories:best-practices': ['warn', { minScore: 0.9 }],
                'categories:seo': ['warn', { minScore: 0.9 }],
                // 'categories:pwa': ['warn', { minScore: 0.5 }],

                'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
                'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
                'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
                'total-blocking-time': ['warn', { maxNumericValue: 300 }],
                'speed-index': ['warn', { maxNumericValue: 3000 }],
            },

            preset: 'lighthouse:no-pwa'
        },
        // Github 임시 저장소
        // upload: {
        //     target: 'temporary-public-storage',
        // },
        upload: {
            target: 'filesystem',
            outputDir: './lhci_reports',
            reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
        }
    },
};
