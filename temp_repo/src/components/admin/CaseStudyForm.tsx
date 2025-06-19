import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { CaseStudy } from '../../types/caseStudy';

interface CaseStudyFormProps {
  caseStudy?: CaseStudy;
  onSave: (caseStudy: Partial<CaseStudy>) => void;
  onCancel: () => void;
}

export const CaseStudyForm: React.FC<CaseStudyFormProps> = ({
  caseStudy,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    title: caseStudy?.title || '',
    subtitle: caseStudy?.subtitle || '',
    location: caseStudy?.location || '',
    propertyType: caseStudy?.propertyType || 'Manufactured Housing',
    siteCount: caseStudy?.siteCount || '',
    timeToSale: caseStudy?.timeToSale || '',
    challenge: caseStudy?.challenge || '',
    solution: caseStudy?.solution || '',
    results: caseStudy?.results?.join('\n') || '',
    heroImage: caseStudy?.heroImage || '',
    introduction: caseStudy?.introduction || '',
    detailedChallenge: caseStudy?.detailedChallenge || '',
    approach: caseStudy?.approach || '',
    outcome: caseStudy?.outcome || '',
    testimonialQuote: caseStudy?.testimonial?.quote || '',
    testimonialAuthor: caseStudy?.testimonial?.author || '',
    agent: caseStudy?.agent || '',
    metaDescription: caseStudy?.metaDescription || '',
    tags: caseStudy?.tags?.join(', ') || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const slug = formData.title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    const caseStudyData: Partial<CaseStudy> = {
      ...caseStudy,
      slug,
      title: formData.title,
      subtitle: formData.subtitle || undefined,
      location: formData.location,
      propertyType: formData.propertyType as CaseStudy['propertyType'],
      siteCount: formData.siteCount ? parseInt(formData.siteCount) : undefined,
      timeToSale: formData.timeToSale || undefined,
      challenge: formData.challenge,
      solution: formData.solution,
      results: formData.results.split('\n').filter(r => r.trim()),
      heroImage: formData.heroImage,
      introduction: formData.introduction || undefined,
      detailedChallenge: formData.detailedChallenge || undefined,
      approach: formData.approach || undefined,
      outcome: formData.outcome || undefined,
      testimonial: formData.testimonialQuote && formData.testimonialAuthor ? {
        quote: formData.testimonialQuote,
        author: formData.testimonialAuthor
      } : undefined,
      agent: formData.agent,
      metaDescription: formData.metaDescription || undefined,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : undefined,
      updatedAt: new Date().toISOString()
    };

    if (!caseStudy) {
      caseStudyData.createdAt = new Date().toISOString();
    }

    onSave(caseStudyData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent className="p-8">
          <h2 className="font-display text-2xl font-bold mb-6">
            {caseStudy ? 'Edit Case Study' : 'Create New Case Study'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  required
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                >
                  <option value="Manufactured Housing">Manufactured Housing</option>
                  <option value="RV Park">RV Park</option>
                  <option value="Self-Storage">Self-Storage</option>
                  <option value="Multi-Asset">Multi-Asset</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Count
                </label>
                <input
                  type="number"
                  name="siteCount"
                  value={formData.siteCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Challenge *
              </label>
              <textarea
                name="challenge"
                required
                rows={3}
                value={formData.challenge}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Solution *
              </label>
              <textarea
                name="solution"
                required
                rows={3}
                value={formData.solution}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Results * (one per line)
              </label>
              <textarea
                name="results"
                required
                rows={4}
                value={formData.results}
                onChange={handleInputChange}
                placeholder="$20,000+ annual cost savings&#10;Resolved complex waste management&#10;Clean close despite challenges"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
              />
            </div>

            {/* Detailed Story */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Detailed Story</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Introduction
                </label>
                <textarea
                  name="introduction"
                  rows={4}
                  value={formData.introduction}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Challenge
                </label>
                <textarea
                  name="detailedChallenge"
                  rows={4}
                  value={formData.detailedChallenge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Our Approach
                </label>
                <textarea
                  name="approach"
                  rows={4}
                  value={formData.approach}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Outcome
                </label>
                <textarea
                  name="outcome"
                  rows={4}
                  value={formData.outcome}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                />
              </div>
            </div>

            {/* Testimonial */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Testimonial</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quote
                </label>
                <textarea
                  name="testimonialQuote"
                  rows={3}
                  value={formData.testimonialQuote}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="testimonialAuthor"
                  value={formData.testimonialAuthor}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                />
              </div>
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent *
                </label>
                <input
                  type="text"
                  name="agent"
                  required
                  value={formData.agent}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Image URL *
                </label>
                <input
                  type="url"
                  name="heroImage"
                  required
                  value={formData.heroImage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                rows={2}
                value={formData.metaDescription}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="RV Park, ADEQ, Environmental, Complex Deal"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Button type="submit" variant="primary">
                {caseStudy ? 'Update Case Study' : 'Create Case Study'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};