import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { PersonalizationProfile, AgeGroup, ActivityLevel, DietaryRestriction, HealthGoal } from '../types/personalization';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';

interface PersonalizationSettingsProps {
  profile: PersonalizationProfile | null;
  onSave: (profile: PersonalizationProfile) => void;
}

export function PersonalizationSettings({ profile, onSave }: PersonalizationSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [age, setAge] = useState<number | undefined>(profile?.age);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(profile?.activityLevel || null);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<DietaryRestriction[]>(profile?.dietaryRestrictions || []);
  const [healthGoals, setHealthGoals] = useState<HealthGoal[]>(profile?.healthGoals || []);

  // Reset form when dialog opens or profile changes
  useEffect(() => {
    if (isOpen) {
      setAge(profile?.age);
      setActivityLevel(profile?.activityLevel || null);
      setDietaryRestrictions(profile?.dietaryRestrictions || []);
      setHealthGoals(profile?.healthGoals || []);
    }
  }, [isOpen, profile]);

  const handleSave = () => {
    const ageGroup = age ? (age >= 2 && age <= 12 ? 'child' : age >= 13 && age <= 19 ? 'teen' : age >= 20 && age <= 64 ? 'adult' : age >= 65 ? 'senior' : null) : null;
    
    onSave({
      age,
      ageGroup: ageGroup as AgeGroup,
      activityLevel,
      dietaryRestrictions: dietaryRestrictions.length > 0 ? dietaryRestrictions : undefined,
      healthGoals: healthGoals.length > 0 ? healthGoals : undefined
    });
    setIsOpen(false);
  };

  const toggleDietaryRestriction = (restriction: DietaryRestriction) => {
    setDietaryRestrictions(prev => 
      prev.includes(restriction) 
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    );
  };

  const toggleHealthGoal = (goal: HealthGoal) => {
    setHealthGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Personalize</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Personalization Settings</DialogTitle>
          <DialogDescription>
            Customize your nutritional recommendations based on your age, activity level, dietary restrictions, and health goals.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={age || ''}
              onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : undefined)}
              min={2}
              max={120}
            />
            <p className="text-xs text-gray-500">
              Your age helps us provide age-appropriate nutritional guidance
            </p>
          </div>

          {/* Activity Level */}
          <div className="space-y-2">
            <Label htmlFor="activity">Activity Level</Label>
            <Select 
              value={activityLevel || undefined} 
              onValueChange={(value) => setActivityLevel(value === 'none' ? null : (value as ActivityLevel))}
            >
              <SelectTrigger id="activity">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                <SelectItem value="moderate">Moderate (light exercise 1-3 days/week)</SelectItem>
                <SelectItem value="active">Active (moderate to intense exercise 3+ days/week)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dietary Restrictions */}
          <div className="space-y-2">
            <Label>Dietary Restrictions</Label>
            <div className="space-y-2">
              {(['diabetic', 'heart-healthy', 'low-sodium', 'gluten-free'] as DietaryRestriction[]).map((restriction) => (
                <div key={restriction} className="flex items-center space-x-2">
                  <Checkbox
                    id={`restriction-${restriction}`}
                    checked={dietaryRestrictions.includes(restriction)}
                    onCheckedChange={() => toggleDietaryRestriction(restriction)}
                  />
                  <Label 
                    htmlFor={`restriction-${restriction}`}
                    className="text-sm font-normal cursor-pointer capitalize"
                  >
                    {restriction.replace('-', ' ')}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Health Goals */}
          <div className="space-y-2">
            <Label>Health Goals</Label>
            <div className="space-y-2">
              {(['weight-loss', 'muscle-gain', 'maintenance', 'heart-health'] as HealthGoal[]).map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={`goal-${goal}`}
                    checked={healthGoals.includes(goal)}
                    onCheckedChange={() => toggleHealthGoal(goal)}
                  />
                  <Label 
                    htmlFor={`goal-${goal}`}
                    className="text-sm font-normal cursor-pointer capitalize"
                  >
                    {goal.replace('-', ' ')}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Save Settings
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

