/**
 * Google Play Store Review Validator
 * Validates apps against Google Play guidelines
 */

import { AndroidAppDefinition } from '../../types/app';

export interface ValidationIssue {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  guideline: string;
  fix?: string;
}

export interface ReviewResult {
  appName: string;
  reviewedAt: string;
  issues: ValidationIssue[];
  criticalCount: number;
  warningCount: number;
  readinessScore: number;
  passedReview: boolean;
}

// Common Play Store rejection reasons
const rejectionPatterns = [
  {
    id: 'permissions',
    severity: 'critical' as const,
    title: 'Permission Requirements',
    description: 'Apps must request only permissions necessary for core functionality',
    guideline: 'https://developer.android.com/guide/topics/permissions/overview',
    check: (app: AndroidAppDefinition) => {
      const hasCamera = app.permissions.includes('android.permission.CAMERA');
      const hasLocation = app.permissions.some(p => p.includes('LOCATION'));
      const hasStorage = app.permissions.some(p => p.includes('STORAGE'));
      
      // Check if sensitive permissions are justified
      if (hasStorage && !app.features.some(f => f.includes('file') || f.includes('document'))) {
        return 'Storage permission may not be necessary for this app';
      }
      return null;
    }
  },
  {
    id: 'target-sdk',
    severity: 'critical' as const,
    title: 'Target SDK Version',
    description: 'Apps must target Android 13 (API 33) or higher',
    guideline: 'https://developer.android.com/google/play/requirements/target-sdk',
    check: (app: AndroidAppDefinition) => {
      if (app.buildConfig?.targetSdk && app.buildConfig.targetSdk < 33) {
        return 'Target SDK must be at least 33';
      }
      return null;
    }
  },
  {
    id: 'crash',
    severity: 'critical' as const,
    title: 'No Crashes',
    description: 'App must not crash or have ANRs',
    guideline: 'https://developer.android.com/distribute/launch-checklist',
    check: (app: AndroidAppDefinition) => {
      // Check for error handling
      return null;
    }
  },
  {
    id: 'ads-policy',
    severity: 'critical' as const,
    title: 'Ad Policy Compliance',
    description: 'Ads must comply with Google Ad policies',
    guideline: 'https://support.google.com/admob/answer/6128743',
    check: (app: AndroidAppDefinition) => {
      const hasAds = app.features.some(f => f.includes('ad') || f.includes('admob'));
      if (hasAds && !app.permissions.includes('INTERNET')) {
        return 'Ads require INTERNET permission';
      }
      return null;
    }
  },
  {
    id: 'in-app-purchases',
    severity: 'critical' as const,
    title: 'In-App Purchases',
    description: 'Use Google Play Billing for all purchases',
    guideline: 'https://developer.android.com/google/play/billing',
    check: (app: AndroidAppDefinition) => {
      const hasIAP = app.features.some(f => f.includes('purchase') || f.includes('payment'));
      if (hasIAP) {
        // Need to add billing dependency
        return null;
      }
      return null;
    }
  },
  {
    id: 'signing',
    severity: 'warning' as const,
    title: 'App Signing',
    description: 'Apps must be signed with valid certificate',
    guideline: 'https://developer.android.com/studio/publish/app-signing',
    check: () => null
  },
  {
    id: 'privacy',
    severity: 'critical' as const,
    title: 'Privacy Policy',
    description: 'Apps collecting data must have privacy policy',
    guideline: 'https://play.google.com/about/privacy',
    check: (app: AndroidAppDefinition) => {
      const collectsData = app.features.some(f => 
        f.includes('analytics') || f.includes('tracking') || f.includes('login')
      );
      if (collectsData) {
        return 'Privacy policy URL is required';
      }
      return null;
    }
  },
  {
    id: 'data-safety',
    severity: 'critical' as const,
    title: 'Data Safety Section',
    description: 'Complete Data Safety section in Play Console',
    guideline: 'https://developer.android.com/guide/topics/data/data-safety',
    check: () => 'Fill out Data Safety form in Play Console'
  }
];

export function validateForPlayStore(app: AndroidAppDefinition): ReviewResult {
  const issues: ValidationIssue[] = [];

  rejectionPatterns.forEach(pattern => {
    const result = pattern.check(app);
    if (result) {
      issues.push({
        id: pattern.id,
        severity: pattern.severity,
        title: pattern.title,
        description: result,
        guideline: pattern.guideline,
        fix: pattern.description
      });
    }
  });

  const criticalCount = issues.filter(i => i.severity === 'critical').length;
  const warningCount = issues.filter(i => i.severity === 'warning').length;
  
  const readinessScore = Math.max(0, 100 - (criticalCount * 20) - (warningCount * 10));

  return {
    appName: app.name,
    reviewedAt: new Date().toISOString(),
    issues,
    criticalCount,
    warningCount,
    readinessScore,
    passedReview: criticalCount === 0
  };
}

export { validateForPlayStore };
