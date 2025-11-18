import { useState } from "react";
import { Search, Filter, MapPin, Banknote, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import JobCard from "@/components/JobCard";
import { mockJobs } from "@/data/mockJobs";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [salaryTypeFilter, setSalaryTypeFilter] = useState("all");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 15;
  
  // Get max and step based on salary type
  const getPriceConfig = () => {
    if (salaryTypeFilter === "fixed") {
      return { max: 100000, step: 1000, default: [0, 100000] };
    }
    return { max: 1000, step: 50, default: [0, 1000] };
  };
  
  const priceConfig = getPriceConfig();
  
  // Reset price range when salary type changes
  const handleSalaryTypeChange = (value: string) => {
    setSalaryTypeFilter(value);
    if (value === "fixed") {
      setPriceRange([0, 100000]);
    } else if (value === "hourly") {
      setPriceRange([0, 1000]);
    }
    handleFilterChange();
  };
  
  // Extract price from salary string
  const extractPrice = (salary: string): number => {
    // Remove commas and extract first number
    const cleanedSalary = salary.replace(/,/g, '');
    const match = cleanedSalary.match(/(\d+)/);
    return match ? parseInt(match[0]) : 0;
  };
  
  const handleAddSkill = (skill: string) => {
    const skillLower = skill.toLowerCase();
    if (skill.trim() && !selectedSkills.includes(skillLower)) {
      setSelectedSkills([...selectedSkills, skillLower]);
      setSkillInput("");
      handleFilterChange();
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skillToRemove));
    handleFilterChange();
  };
  
  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = searchQuery === "" || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = locationFilter === "all" || 
      job.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesSalaryType = salaryTypeFilter === "all" || 
      job.salaryType === salaryTypeFilter;
    
    const matchesSkill = selectedSkills.length === 0 || 
      selectedSkills.some(selectedSkill => 
        job.skills.some(jobSkill => jobSkill.toLowerCase().includes(selectedSkill))
      );
    
    // Price range filter
    const jobPrice = extractPrice(job.salary);
    const matchesPriceRange = salaryTypeFilter === "all" || 
      (jobPrice >= priceRange[0] && jobPrice <= priceRange[1]);
    
    return matchesSearch && matchesLocation && matchesSalaryType && matchesSkill && matchesPriceRange;
  });
  
  const allSkills = Array.from(new Set(mockJobs.flatMap(job => job.skills)));
  const locations = Array.from(new Set(mockJobs.map(job => job.location.split('/')[0].trim())));
  
  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);
  
  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find IT Jobs</h1>
          <p className="text-muted-foreground">
            {filteredJobs.length} opportunities available
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-soft">
          <div className="grid gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search jobs, companies, or skills..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <Select value={locationFilter} onValueChange={(value) => { setLocationFilter(value); handleFilterChange(); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(loc => (
                      <SelectItem key={loc} value={loc.toLowerCase()}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Banknote className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <Select value={salaryTypeFilter} onValueChange={handleSalaryTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Salary Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                    <SelectItem value="fixed">Fixed Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <Select 
                  value={skillInput} 
                  onValueChange={(value) => {
                    setSkillInput(value);
                    handleAddSkill(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Add skills..." />
                  </SelectTrigger>
                  <SelectContent>
                    {allSkills
                      .filter(skill => !selectedSkills.includes(skill.toLowerCase()))
                      .map(skill => (
                        <SelectItem key={skill} value={skill.toLowerCase()}>
                          {skill}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Selected Skills Display */}
            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 p-4 bg-secondary/30 rounded-lg">
                {selectedSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="pl-3 pr-1 py-1.5">
                    {allSkills.find(s => s.toLowerCase() === skill) || skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Price Range Slider - shown when salary type is selected */}
            {(salaryTypeFilter === "hourly" || salaryTypeFilter === "fixed") && (
              <div className="space-y-3 p-4 bg-secondary/30 rounded-lg">
                <Label className="text-sm font-medium">
                  Price Range: {priceRange[0].toLocaleString()} kr - {priceRange[1].toLocaleString()} kr
                  {salaryTypeFilter === "hourly" ? "/hr" : ""}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={priceConfig.max}
                  step={priceConfig.step}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 kr</span>
                  <span>{priceConfig.max.toLocaleString()} kr</span>
                </div>
              </div>
            )}
            
            {(searchQuery || locationFilter !== "all" || salaryTypeFilter !== "all" || selectedSkills.length > 0) && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setSearchQuery("");
                  setLocationFilter("all");
                  setSalaryTypeFilter("all");
                  setSelectedSkills([]);
                  setPriceRange([0, 1000]);
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
        
        {/* Job Results */}
        {filteredJobs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentJobs.map((job, index) => (
                <JobCard key={job.id} {...job} isSponsored={startIndex + index < 2} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="min-w-[40px]"
                  >
                    {page}
                  </Button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No jobs found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setLocationFilter("all");
                setSalaryTypeFilter("all");
                setSelectedSkills([]);
                setPriceRange([0, 1000]);
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
