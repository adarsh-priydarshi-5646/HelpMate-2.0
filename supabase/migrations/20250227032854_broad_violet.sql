/*
  # Create memories table for persistent user memory

  1. New Tables
    - `memories`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `content` (text)
      - `keywords` (text array)
      - `category` (text)
      - `source` (text)
      - `timestamp` (timestamptz)
  2. Security
    - Enable RLS on `memories` table
    - Add policy for authenticated users to read/write their own memories
*/

CREATE TABLE IF NOT EXISTS memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  keywords text[] DEFAULT '{}',
  category text,
  source text DEFAULT 'chat',
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own memories"
  ON memories
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own memories"
  ON memories
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own memories"
  ON memories
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own memories"
  ON memories
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster keyword searches
CREATE INDEX IF NOT EXISTS memories_keywords_idx ON memories USING GIN (keywords);