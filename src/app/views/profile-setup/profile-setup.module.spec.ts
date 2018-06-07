import { ProfileSetupModule } from './profile-setup.module';

describe('ProfileSetupModule', () => {
  let profileSetupModule: ProfileSetupModule;

  beforeEach(() => {
    profileSetupModule = new ProfileSetupModule();
  });

  it('should create an instance', () => {
    expect(profileSetupModule).toBeTruthy();
  });
});
