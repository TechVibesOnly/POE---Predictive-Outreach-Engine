import { 
  db, 
  collection, 
  doc, 
  setDoc, 
  Timestamp 
} from '../firebase';

export const seedDatabase = async (userId: string) => {
  console.log('Starting database seed for user:', userId);

  // 1. Create Campaigns
  const campaignIds: string[] = [];
  const campaignStatuses = ['active', 'paused', 'draft', 'completed', 'active'];
  const campaignTypes = ['reddit', 'linkedin', 'email', 'reddit', 'linkedin'];
  
  for (let i = 0; i < 5; i++) {
    const id = `campaign_${i}_${Date.now()}`;
    campaignIds.push(id);
    await setDoc(doc(db, 'campaigns', id), {
      id,
      name: `Growth Campaign ${i + 1}`,
      status: campaignStatuses[i],
      type: campaignTypes[i],
      prospectCount: Math.floor(Math.random() * 100),
      replyRate: Math.random() * 15,
      intentScore: 70 + Math.random() * 25,
      createdAt: Timestamp.now(),
      ownerId: userId
    });
  }

  // 2. Create Prospects
  const prospectIds: string[] = [];
  const discTypes = ['D', 'I', 'S', 'C'];
  const prospectStatuses = ['new', 'contacted', 'replied', 'converted', 'rejected'];
  
  for (let i = 0; i < 50; i++) {
    const id = `prospect_${i}_${Date.now()}`;
    prospectIds.push(id);
    await setDoc(doc(db, 'prospects', id), {
      id,
      name: `Prospect ${i + 1}`,
      email: `prospect${i}@example.com`,
      company: `Company ${Math.floor(i / 5) + 1}`,
      role: ['CEO', 'CTO', 'VP Sales', 'Marketing Director'][Math.floor(Math.random() * 4)],
      intentScore: 50 + Math.random() * 45,
      discType: discTypes[Math.floor(Math.random() * 4)],
      status: prospectStatuses[Math.floor(Math.random() * 5)],
      campaignId: campaignIds[Math.floor(Math.random() * campaignIds.length)],
      ownerId: userId,
      lastSignalAt: Timestamp.now()
    });
  }

  // 3. Create Signals
  for (let i = 0; i < 200; i++) {
    const id = `signal_${i}_${Date.now()}`;
    const source = i < 100 ? 'reddit' : 'linkedin';
    await setDoc(doc(db, 'signals', id), {
      id,
      source,
      content: source === 'reddit' 
        ? `Looking for a solution to ${['automate outreach', 'find leads', 'scale sales'][Math.floor(Math.random() * 3)]} on r/SaaS`
        : `Just posted about ${['hiring sales reps', 'new product launch', 'expanding to US'][Math.floor(Math.random() * 3)]} on LinkedIn`,
      author: `User_${Math.floor(Math.random() * 1000)}`,
      intentScore: 40 + Math.random() * 55,
      timestamp: Timestamp.now(),
      url: source === 'reddit' ? 'https://reddit.com/r/SaaS' : 'https://linkedin.com/feed',
      ownerId: userId
    });
  }

  // 4. Create Generated Emails
  for (let i = 0; i < 20; i++) {
    const id = `email_${i}_${Date.now()}`;
    await setDoc(doc(db, 'emails', id), {
      id,
      prospectId: prospectIds[i],
      campaignId: campaignIds[Math.floor(Math.random() * campaignIds.length)],
      subject: `Quick question about your ${['recent post', 'growth goals', 'strategy'][Math.floor(Math.random() * 3)]}`,
      body: "Hi, I saw your recent activity and thought we could help...",
      status: 'sent',
      ownerId: userId,
      createdAt: Timestamp.now()
    });
  }

  // 5. Create A/B Tests
  const testStatuses = ['ongoing', 'completed', 'completed'];
  const winners = ['none', 'A', 'B'];
  for (let i = 0; i < 3; i++) {
    const id = `test_${i}_${Date.now()}`;
    await setDoc(doc(db, 'abTests', id), {
      id,
      campaignId: campaignIds[i],
      variantA: "Hey, saw your post on Reddit...",
      variantB: "I noticed you're scaling your team...",
      winner: winners[i],
      status: testStatuses[i],
      ownerId: userId
    });
  }

  // 6. Create Sequence Templates
  for (let i = 0; i < 2; i++) {
    const id = `sequence_${i}_${Date.now()}`;
    await setDoc(doc(db, 'sequences', id), {
      id,
      name: i === 0 ? "High Intent Reddit Sequence" : "LinkedIn Executive Outreach",
      steps: [
        { type: 'email', delay: 0, subject: 'Intro' },
        { type: 'linkedin_connect', delay: 2 },
        { type: 'email_followup', delay: 3 }
      ],
      ownerId: userId
    });
  }

  console.log('Seeding complete!');
};
