"use client";
import { coworks } from "@/constants";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const LandingCowork = () => {
  
  return (
    <div className="px-10 py-20">
      <h2 className="mb-10 text-center text-4xl text-white  font-extrabold">
        사용 후기들
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {coworks.map((cowork, index) => (
          <Card key={index} className="bg-gray-800 border-none text-white">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-x-1">
                <p className="text-lg">{cowork.name}</p>
                <p className="text-sm">{cowork.title}</p>
              </CardTitle>
            </CardHeader>
            <CardDescription className="px-4 pb-4">
              {cowork.description}
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default LandingCowork;