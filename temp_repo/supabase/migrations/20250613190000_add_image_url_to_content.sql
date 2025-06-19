-- Migration: Add image_url column to insights and market_reports tables for article images
alter table insights add column if not exists image_url text;
alter table market_reports add column if not exists image_url text;
