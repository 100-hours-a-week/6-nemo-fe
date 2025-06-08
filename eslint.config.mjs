import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),

  {
    plugins: ["boundaries"],

    settings: {
      // FSD 아키텍처의 각 레이어 정의
      "boundaries/elements": [
        {
          type: "app",
          pattern: "src/app/**/*"
        },
        {
          type: "widgets",
          pattern: "src/widgets/**/*"
        },
        {
          type: "features",
          pattern: "src/features/**/*"
        },
        {
          type: "entities",
          pattern: "src/entities/**/*"
        },
        {
          type: "shared",
          pattern: "src/shared/**/*"
        }
      ]
    },

    rules: {
      // FSD 레이어 간 의존성 규칙 강제
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: ["widgets", "features", "entities", "shared"]
            },
            {
              from: "widgets",
              allow: ["features", "entities", "shared"]
            },
            {
              from: "features",
              allow: ["entities", "shared"]
            },
            {
              from: "entities",
              allow: ["shared"]
            },
            {
              from: "shared",
              allow: []
            }
          ]
        }
      ],

      // Public API 사용 강제
      "import/no-internal-modules": [
        "error",
        {
          allow: [
            "@/shared/*/index",
            "@/entities/*/index",
            "@/features/*/index",
            "@/widgets/*/index",

            "next/*",
            "react",
            "react-dom",

            "@tanstack/**",
            "zustand/*",
            "sonner",
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
            "@radix-ui/**",
            "js-confetti",

            "src/shared/**",
            "@/shared/**",

            "lib/**",
            "@/lib/**"
          ]
        }
      ],

      // Import 순서
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          pathGroups: [
            {
              pattern: "@/app/**",
              group: "internal",
              position: "before"
            },
            {
              pattern: "@/widgets/**",
              group: "internal",
              position: "before"
            },
            {
              pattern: "@/features/**",
              group: "internal",
              position: "before"
            },
            {
              pattern: "@/entities/**",
              group: "internal",
              position: "before"
            },
            {
              pattern: "@/shared/**",
              group: "internal",
              position: "before"
            }
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "never",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ],

      // TypeScript 관련
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-const": "error",

      // React 관련
      "react/jsx-curly-brace-presence": [
        "warn",
        { props: "never", children: "never" }
      ],
      "react/self-closing-comp": "warn",
      "react/jsx-boolean-value": ["warn", "never"],

      // 일반
      "prefer-const": "error",
      "no-var": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "no-duplicate-imports": "error",

      // 접근성
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn"
    }
  },

  // Next.js 설정 파일 예외
  {
    files: ["**/*.config.{js,mjs,ts}", "**/middleware.ts"],
    rules: {
      "import/no-anonymous-default-export": "off",
      "boundaries/element-types": "off"
    }
  },

  // 테스트 파일 규칙
  {
    files: ["**/*.test.{js,ts,tsx}", "**/*.spec.{js,ts,tsx}", "**/__tests__/**"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
      "boundaries/element-types": "off"
    }
  }
];

export default eslintConfig;
