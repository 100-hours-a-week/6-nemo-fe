module.exports = {
    ci: {
        collect: {
            // staticDistDir: "./.next",

            // 서버 시작 방식
            startServerCommand: "pnpm start",
            startServerReadyPattern: "Ready in",
            startServerReadyTimeout: 30000,
            url: [
                'http://localhost:3000/groups',
                // 'http://localhost:3000/login',
                // 'http://localhost:3000/my-nemo?tab=group',
                // 'http://localhost:3000/my-nemo?tab=schedule',
                // 'http://localhost:3000/my-profile',
            ],
            numberOfRuns: 3, // 각 URL당 3번 실행하여 평균값 계산
            settings: {
                preset: 'desktop',
            },
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
