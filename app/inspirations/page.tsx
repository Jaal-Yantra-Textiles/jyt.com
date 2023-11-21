"use client"
// pages/inspirations.js
import React, { Suspense } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import Loading from './loading';
import Subscription from '@/components/subscription';

const fetcher = (...args: any) => fetch(...args).then(res => res.json());

const InspirationsPage = () => {
  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold mb-4">Inspirations</h1>
      <Suspense fallback={<div><Loading/></div>}>
        <InspirationsGrid />
      </Suspense>
    </div>
  );
};

const InspirationsGrid = () => {
  const { data } = useSWR('https://api.cynsar.capital/items/inspiration_process?fields[]=id,inspiration_name,images_for_inspiration.*.filename_disk', fetcher);

  if (!data) return null;

  return (
    <>
    <div className="w-full">
    {data.data.map((inspiration: any) => (
      <div key={inspiration.id} className="border rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">{inspiration.inspiration_name}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {inspiration.images_for_inspiration.map((image: any) => (
            <div key={image.id} className="relative w-full h-64">
              <Image
                src={`https://directus-bucket-jy.s3.us-east-1.amazonaws.com/${image.directus_files_id.filename_disk}`}
                alt={inspiration.inspiration_name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
  <Subscription/>
  </>
);
};

export default InspirationsPage;
